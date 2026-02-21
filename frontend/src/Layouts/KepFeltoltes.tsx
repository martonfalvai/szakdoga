import ImageUpload from "../components/ImageUploader";
import ShowImage from "../components/ShowImage";

export default function KepFeltoltes() {
  return (
    <div>
      <ImageUpload
        rentId={2}
        token="2|5VUapspnURkhhsBqANNUc5N3p6e3FsBbCL0klYifcd6e762b"
      />
      <ShowImage />
    </div>
  );
}
