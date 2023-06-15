export const remove = (arr: Array<any>, arg: any) => {
    const result: Array<any> = arr.filter((item) => { return item !== arg })
    return result;
}
