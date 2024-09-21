interface IProps{
imgeURL:string,
alt:string,
classes:string
}
function Image ({imgeURL,alt,classes}:IProps) {
  return (
    <img src={imgeURL} alt={alt} className={classes}/>
  )
}

export default Image