import { useEffect, useState } from "react"
import LabeledInput from "../../../Components/Elements/LabeledInput/LabeledInput"
import LabeledInputWrap from "../../../Components/Elements/LabeledInput/LabeledInputWrap"
import ButtonFile from '../../../Components/Elements/Button/ButtonFile'
import ButtonMain from '../../../Components/Elements/Button/Button'
import { CircleLoading } from '../../../Components/Elements/LoadingAsset/CircleLoading'
import { Done } from "@mui/icons-material"
import CirclePhoto from "../../../Components/Elements/UserProfile/CircleUseredPhoto"
import { DBGetUser, UpdateUser } from "../../../Function/DBUser"
import CheckboxLabel from "../../Elements/Checkbox/CheckboxLabel"

const UpdateUserForm = () => {
    const [isLoading, setIsLoading] = useState(false)

    const [idUser, setIdUser] = useState('')
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [image, setImage] = useState(null)
    const [imagePreview, setImagePreview] = useState(null)
    const [isDeleteImage, setDeleteImage] = useState(false)


    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const result = await DBGetUser();
                setUsername(result.name)
                setEmail(result.email)
                setImagePreview(result.image)
                setIdUser(result.id)
            } catch (err) {
                console.log(err);
            }
        };


        fetchUserData();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (username) {
            try {
                // Pastikan image yang dikirim adalah File
                if (image instanceof File) {
                    await UpdateUser({
                        id: idUser,
                        username: username,
                        email: email,
                        image: image,
                    });
                } else if (image == null) {
                    await UpdateUser({
                        id: idUser,
                        username: username,
                        email: email
                    });
                } else {
                    alert("Invalid image.");
                }
            } catch (error) {
                alert("Sorry, failed to update data");
                console.error("Error: ", error);
            }
        }
    };


    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className="mt-4">
                    <CirclePhoto username={username} userphoto={imagePreview} />
                    <LabeledInputWrap variant="mt-4">
                        <ButtonFile accept=".jpg, .png" onchange={(e) => setImage(e.target.files[0])} name="photo" text="Add Profile Photo" info="Accepted (max:5MB): JPG, PNG" customButton={false} />
                    </LabeledInputWrap>
                </div>
                <LabeledInputWrap variant="mt-4">
                    <LabeledInput maxlength={30} value={username} onchange={(e) => setUsername(e.target.value)} type="text" name="name" text="What's Your Name?" placeholder="Start typing here..." info="This helps us personalize your experience." />
                    <LabeledInput maxlength={30} value={email} onchange={(e) => setEmail(e.target.value)} type="email" name="email" text="Email Address" placeholder="johncena@email.com" info="Subscribe for exclusive updates!" />
                </LabeledInputWrap>
                <div className="px-3 mt-4">
                    <CheckboxLabel text="Delete image?" checked={isDeleteImage} onchange={(e) => setDeleteImage(e.target.checked)} />
                </div>
                <div className="mt-4">
                    <ButtonMain isLoading={isLoading ? true : false} disabled={isLoading ? true : false} variant="bg-btn-primary gap-2">
                        {
                            isLoading ? <CircleLoading size={23} isLoading={true} /> : <Done />
                        }
                        Done</ButtonMain>
                </div>
            </form>
        </>
    )
}

export { UpdateUserForm }