export function comparePathToWord(pathname, word) {
    const parts = pathname.split('/');
    for(var i = 0; i < parts.length; i ++)
    {
        if (parts[i] === word)
            return true;
    }
    return false;
}