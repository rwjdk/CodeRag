window.downloadFileFromStream = async (fileName, contentStreamReference) => {
    const arrayBuffer = await contentStreamReference.arrayBuffer();
    const uint8Array = new Uint8Array(arrayBuffer);
    const utf8WithBomArray = new Uint8Array([0xEF, 0xBB, 0xBF, ...uint8Array]); // Add BOM
    const blob = new Blob([utf8WithBomArray], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const anchorElement = document.createElement('a');
    anchorElement.href = url;
    anchorElement.download = fileName ?? '';
    anchorElement.click();
    anchorElement.remove();
    URL.revokeObjectURL(url);
}