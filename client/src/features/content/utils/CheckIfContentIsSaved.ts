export function checkIfContentIsSaved(
    savedContent: SavedContent[] | undefined,
    contentId: string,
    saveBtn?: Record<string, any> | undefined
) {
    const list = new Set(savedContent?.map((item) => item.content_id));

    if (list.has(Number(contentId))) {
        return true;
    } else if (saveBtn && Object.keys(saveBtn).length !== 0) {
        return saveBtn[contentId]; // Returns true, false, or undefined.
    } else {
        return false;
    }
}
