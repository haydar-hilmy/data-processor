import { Analytics } from "@mui/icons-material"
import ButtonMain from "../Elements/Button/Button"
import ButtonFile from "../Elements/Button/ButtonFile"
import Header from "../Fragments/Header/Header"
import MainLayout from "../Layouts/MainLayout"
import { DBGetUser } from "../../Function/DBUser"
import { useState } from "react"

const Dashboard = () => {

    const [UserData, setUserData] = useState({name: "..."})

    
    DBGetUser().then((result) => {
        setUserData(result)
    }).catch(err => {
        console.log(err)
    })
    
    return (
        <MainLayout title="Overview Dashboard" tab="dashboard">
            <Header headerText={`Welcome, ${UserData.name}`}>
                <ButtonFile text="Upload" name="file" accept=".csv" customButton={false} />
                <ButtonMain variant="bg-blue-800"><Analytics/> Analyze</ButtonMain>
            </Header>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Modi quisquam rerum quam perferendis sit exercitationem corrupti doloribus nulla numquam similique, nisi, nobis, maiores est aliquam debitis quo autem impedit doloremque?
            Vero praesentium ab sequi quam eius error eos? Similique voluptatum doloremque excepturi ea dolorum aperiam, sequi libero veritatis eum blanditiis error placeat minus ratione. Natus sapiente laudantium ipsam nisi cum?
            Eos ullam esse suscipit, laborum illum fugit magni ut aut aliquid pariatur incidunt sapiente adipisci autem, natus corporis accusamus laboriosam cupiditate maiores quibusdam, beatae sequi? Delectus aspernatur laborum praesentium? A.
            Dignissimos perspiciatis pariatur temporibus aspernatur dolorum cupiditate harum dolores ratione dolorem consequuntur cumque molestias, magnam quia ducimus. Eligendi perspiciatis corrupti nobis, expedita itaque quidem voluptatibus molestiae excepturi possimus magnam. Omnis.
            Reprehenderit dolores repudiandae excepturi doloribus! Officiis delectus sunt in facilis, alias vel impedit nobis? Doloremque ut ipsum voluptatum delectus laudantium magnam, tempora voluptates, nam vel maiores quam, aliquam error obcaecati.
            Nemo veritatis assumenda praesentium voluptates non reiciendis cumque aperiam nesciunt accusamus debitis, quod esse dolores inventore vitae ipsam ea maiores accusantium repudiandae nam voluptatum. Eos quibusdam perferendis dolor dolore fuga.
            Dignissimos excepturi, nam quod nisi repellendus nulla ipsam laboriosam nemo molestias non mollitia cumque ad. Voluptates, exercitationem nemo dignissimos excepturi maxime non, totam accusamus quisquam illum dolore, perferendis provident dolorem.
            Est temporibus totam id commodi, nihil numquam perferendis eius cumque possimus illum recusandae. Modi, ad, vel pariatur tempora voluptatem sit hic quasi perspiciatis ab recusandae reprehenderit, dignissimos dolorum sint assumenda.
            Eius, rem tenetur repellendus odio eveniet similique accusantium expedita at maxime minima. Harum hic quas dolore eaque ea recusandae, nemo labore cumque ducimus! Doloremque perferendis provident ea, nihil magni eum.
            Eum quidem molestiae omnis dolorum, nulla ducimus dolorem placeat alias, laboriosam corrupti, rerum error. Eos tenetur ipsa corrupti ex voluptatem tempore quod blanditiis, cumque libero adipisci sapiente? Blanditiis, voluptatum dicta!
            Numquam consequuntur perferendis veritatis temporibus optio dolorem, itaque fuga. Modi commodi cumque, consequuntur odio, nostrum iure cupiditate aliquid, iste perferendis perspiciatis fuga aspernatur odit voluptate? Voluptates ex suscipit repellendus ipsa.
            Maiores, aut? Laborum dolores veniam labore, non omnis voluptatum voluptatem, fugit hic nesciunt aliquam laudantium quia nihil, corporis nobis quisquam quam autem quibusdam nulla aut quae molestiae fuga? Impedit, accusamus.
            Eligendi, sed odio doloremque molestiae tempora, fugit, quaerat veniam praesentium maiores cumque quisquam animi voluptas perferendis hic expedita eos maxime provident fuga voluptates aliquam corporis. Ratione quasi ipsam nam qui!
            Nemo in tenetur libero, est nobis exercitationem nam itaque, quo quae culpa quia quam veritatis delectus obcaecati illo error, eum modi! Tempora exercitationem neque voluptas! Quod reiciendis autem aliquam facilis.
            Praesentium soluta sapiente fugiat veniam placeat magni cum ducimus eligendi, totam illo delectus harum quos, provident a. Magni quaerat ab fuga? Expedita quisquam voluptas ex itaque recusandae magnam labore optio!
            Quis, nam adipisci. Sunt numquam dicta dolorum! Consequatur earum cum quisquam mollitia sint voluptatum non ex maiores libero est deserunt commodi dignissimos, adipisci, magnam ipsam ea, esse magni voluptas delectus?
            Autem, nobis. Fuga molestias, eveniet provident dolor illum iste voluptatibus. Illo totam iusto quas, provident corporis nesciunt commodi iste deserunt! Omnis, nesciunt? Dignissimos saepe soluta dolores dolor atque aliquid eaque!
            Ad saepe, sapiente fugit voluptate molestiae placeat distinctio optio modi. Possimus omnis obcaecati facere sapiente ea ex similique ipsum, odio consequuntur ab deserunt tempore quidem in ad dolores eos dolor.
            Eius laboriosam eum quidem voluptatum porro vero doloribus ipsum soluta, minus facere nesciunt accusantium cupiditate voluptas consequatur est eos at quasi ex fugit ratione a cumque. Aut cupiditate laboriosam maiores?
            Quis rerum voluptatem natus. Voluptatem culpa assumenda harum soluta impedit repudiandae asperiores tenetur cupiditate molestias, libero facilis porro aperiam vitae, cumque at reprehenderit quia enim sapiente quae nulla iusto. Quaerat?
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sequi ratione, amet tenetur perspiciatis neque repellat mollitia saepe enim soluta sapiente eaque earum atque incidunt a commodi expedita possimus iusto ipsum?
            Sequi ad repellat similique magnam dolorum impedit, optio temporibus ratione nulla incidunt expedita excepturi pariatur iste molestias? Odit quia officia incidunt. Perferendis, vero tempora rem repellat dignissimos nobis voluptas optio!
        </MainLayout>
    )
}

export default Dashboard