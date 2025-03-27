export default class ShiftManager {
    constructor(test = true) {
        this.currentUser = null;
        this.shiftQueue = [];
        this.lastUser = null;
        this.history = [];
        this.test = test;
        this.shift = 0;
        this.nextUserId = 1;
    }

    registerUser(user) {
        if (!user.id) {
            user.id = this.nextUserId++;
        }
        return user;
    }

    log(message) {
        if (this.test) console.log(message);
    }

    takeShift(user, turns, reason = "") {
        user = this.registerUser(user);

        if (this.shift === 0) {
            this.currentUser = { user, turns };
            this.history.push({ action: "First shift taken by user", user });
            this.log(`First user: ${user.name} took a shift.`);
            return this.advance();
        } else {
            if (this.currentUser?.user.id !== user.id) {                
                return this.requestShift(user, turns, reason);
            }
            return false;
        }
    }
    
    useShift(user) {
        user = this.registerUser(user);

        if (!this.currentUser) {
            this.advance();
            return false;
        }
        if (this.currentUser?.user.id === user.id) {
            this.log(`${user.name} used a shift.`);
            return this.advance();
        }
        return false;
    }
    
    removeUser(user) {
        user = this.registerUser(user);

        if (this.currentUser?.user.id === user.id) {
            this.history.push({ action: "User left", user });
            this.lastUser = null;
            this.currentUser = null;
            this.advance();
        }
        
        this.shiftQueue = this.shiftQueue.filter(entry => entry.user.id !== user.id);
        this.history.push({ action: "User removed from queue", user });
        this.log(`User removed from queue: ${user.name}`);
        this.log(`Remaining in queue: ${this.shiftQueue.map(u => u.user.name).join(", ") || "None"}`);
    }

    requestShift(user, turns, reason = "") {
        user = this.registerUser(user);

        if (this.shiftQueue.some(entry => entry.user.id === user.id)) return false;

        this.shiftQueue.push({ user, turns });
        this.history.push({ action: "added to queue", user, turns, reason: reason });
        this.log(`${user.name} added to queue with ${turns} turns.`);
        return false;
    }

    cancelShift(user) {
        user = this.registerUser(user);

        this.shiftQueue = this.shiftQueue.filter(entry => entry.user.id !== user.id);
        this.history.push({ action: "shift canceled", user });
        this.log(`${user.name} canceled their shift.`);
    }

    advance() {
        if (!this.currentUser && this.shiftQueue.length > 0) {
            this.currentUser = this.shiftQueue.shift() || null;
            this.shift++;
            this.log(`Shift assigned to ${this.currentUser.user.name}.`);
            
            return true;
        }
        if (this.currentUser) {
            if (--this.currentUser.turns === 0) {
                this.lastUser = this.currentUser;
                this.history.push({ action: "shift completed", user: this.lastUser.user });
                this.log(`${this.lastUser.user.name} completed their shift.`);
                this.currentUser = this.shiftQueue.shift() || null;
            }
            this.log(`Remaining in queue: ${this.shiftQueue.map(u => u.user.name).join(", ") || "None"}`);
            this.shift++;
            return true;
        }
    
        return false;
    }
    
    reset() {
        this.currentUser = null;
        this.shiftQueue = [];
        this.lastUser = null;
        this.history.push({ action: "system reset" });
        this.log("System has been reset.");
    }

    getStatus() {
        return this.currentUser
            ? `${this.currentUser.user.name} has ${this.currentUser.turns} turns left.`
            : "No active shifts.";
    }

    update() {
    }
}
