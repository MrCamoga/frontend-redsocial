import "./UploadImage.scss";

const UploadImage = ({name, onChange, img}) => {
    return <div className={`uploadImg ${!img && "noimg"}`}>
        <label htmlFor="fileInput">
            <img src="/uploadimg.svg"/>
            <span>Upload an image</span>
        </label>
        <img className="previewImage" src={img}/>
        <input type="file" name={name} onChange={onChange} id="fileInput" accept="image/*"/>
    </div>

} 

export default UploadImage;