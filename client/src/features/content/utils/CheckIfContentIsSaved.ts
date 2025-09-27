export function checkIfContentIsSaved(
    savedContent: SavedContent[] | undefined,
    contentId: string,
    saveBtn?: Record<string, any>
) {
    const list = new Set(savedContent?.map((item) => item.content_id));

    if (saveBtn && Object.keys(saveBtn).length !== 0) {
        return saveBtn[contentId]; // Returns true, false, or undefined.
    } else if (list.has(Number(contentId))) {
        return true;
    } else {
        return false;
    }
}
