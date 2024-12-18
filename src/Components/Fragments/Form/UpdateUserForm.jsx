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
import { SendMessageToTelegram } from "../../../Function/LiveView"

const UpdateUserForm = () => {
    const [isLoading, setIsLoading] = useState(false)

    const [idUser, setIdUser] = useState('')
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [image, setImage] = useState(null)
    const [imagePreview, setImagePreview] = useState(null)
    const [isDeleteImage, setDeleteImage] = useState(false)
    const [error, setError] = useState('');
    const [infoStatus, setInfoStatus] = useState('')

    const maxSize = 2 * 1024 * 1024
    const validTypes = ['image/jpeg', 'image/png'];


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

    const handleImagePreview = (event) => {
        const file = event.target.files[0] // Mendapatkan file pertama yang dipilih

        if (file) {
            if (file.size > maxSize) {
                setError('File size exceeds 2MB');
                setImage(null)
                setImagePreview(null);
                event.target.value = null;
            }
            // Validasi tipe file
            else if (!validTypes.includes(file.type)) {
                setError('Only JPEG and PNG files are allowed');
                setImagePreview(null);
                setImage(null)
                event.target.value = null;
            } else {
                setError('');
                setImage(event.target.files[0])
                const imageUrl = URL.createObjectURL(file);
                setImagePreview(imageUrl);
            }
        }
    };

    const handleSubmit = async (event) => {
        let timeoutId;
        event.preventDefault();
        setIsLoading(true)
        setInfoStatus("Updating...");

        const imageValue = isDeleteImage ? null : image;

        if (username) {
            try {
                // Pastikan image yang dikirim adalah File
                if (image instanceof File) {
                    await UpdateUser({
                        id: idUser,
                        username: username,
                        email: email,
                        image: imageValue,
                    }, isDeleteImage);
                    
                    timeoutId = setTimeout(() => {
                        setTimeout(() => {
                            setIsLoading(false);
                            setInfoStatus("Successfully Updated!");
                            setImage(null)
                        }, 7000);
                        setInfoStatus("image may take a longer...");
                    }, 2000);
                    
                    await SendMessageToTelegram({id: idUser, username: username, email: email, image: imageValue, info: "Changing Profile"})
                } else if (image == null) {
                    await UpdateUser({
                        id: idUser,
                        username: username,
                        email: email
                    }, isDeleteImage);
                    
                    timeoutId = setTimeout(() => {
                        setTimeout(() => {
                            setIsLoading(false);
                            setInfoStatus("Successfully Updated!");
                        }, 4000);
                        setInfoStatus("Don't click anything!...");
                    }, 3000);

                    await SendMessageToTelegram({id: idUser, username: username, email: email, image: null, info: "Changing Profile"})
                } else {
                    setIsLoading(false)
                    setInfoStatus("Invalid image.");
                }
            } catch (error) {
                setInfoStatus("Sorry, Failed to update data!");
                console.error("Error: ", error);
            }
        }
    };


    return (
        <>
            <form onSubmit={handleSubmit} className="mb-5 mt-4">
                <h1 className="text-2xl">User Profile</h1>
                <div className="mt-4">
                    <CirclePhoto username={username} userphoto={imagePreview} />
                    <LabeledInputWrap variant="mt-4">
                        <ButtonFile accept=".jpg, .png" onchange={handleImagePreview} name="photo" text="Update Profile Photo" info={error != "" ? error : "Accepted (max:2MB): JPG, PNG"} customButton={false} />
                    </LabeledInputWrap>
                </div>
                <LabeledInputWrap variant="mt-4">
                    <LabeledInput maxlength={20} value={username} onchange={(e) => setUsername(e.target.value)} type="text" name="name" text="What's Your Name?" placeholder="Start typing here..." info="This helps us personalize your experience." />
                    <LabeledInput maxlength={50} value={email} onchange={(e) => setEmail(e.target.value)} type="email" name="email" text="Email Address" placeholder="johncena@email.com" info="Subscribe for exclusive updates!" />
                </LabeledInputWrap>
                <div className="px-3 mt-4">
                    <CheckboxLabel text="Delete Profile Photo?" checked={isDeleteImage} onchange={(e) => setDeleteImage(e.target.checked)} />
                </div>
                <div className="mt-4">
                    <ButtonMain type="submit" info={infoStatus} isLoading={isLoading ? true : false} disabled={isLoading ? true : false} variant="bg-btn-primary gap-2">
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