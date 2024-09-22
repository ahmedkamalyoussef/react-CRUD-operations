/**
 * 
 * @param {string} txt -the text to be sliced
 * @param {number} [max =50 ] -max length 
 * @returns -sliced text ends with ...
 */
export function TextSlicer(txt:string,max:number=90){
    if(txt.length>=max)
        return `${txt.slice(0,max)}...`
    return txt
}