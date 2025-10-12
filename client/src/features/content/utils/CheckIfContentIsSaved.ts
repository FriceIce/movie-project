import checkIfObjectIsEmpty from '@/utils/checkIfObjectIsEmpty';

export function checkIfContentIsSaved(
    savedContent: SavedContent[] | undefined,
    contentId: string,
    saveBtn?: Record<string, any> | undefined
) {
    if (!savedContent) console.error({ savedContent });

    const list = new Set(savedContent?.map((item) => item.content_id));
    const objectLengthIsEmpty = checkIfObjectIsEmpty(saveBtn || {}); // output: true or false

    if (list.has(Number(contentId))) {
        return true;
    } else if (saveBtn && !objectLengthIsEmpty) {
        if (saveBtn[contentId] === undefined) return false;
        return saveBtn[contentId]; // Returns true or false.
    } else {
        return false;
    }
}
