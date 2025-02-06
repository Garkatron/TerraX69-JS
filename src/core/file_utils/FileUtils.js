export default class FileUtils {
    static async loadFile(url) {
        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
            return await response.text();
        } catch (e) {
            console.error('[FileUtils] -> Error:', e.stack);
            return null;
        }
    }
}
