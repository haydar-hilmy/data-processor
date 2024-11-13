import { div } from "@tensorflow/tfjs"

const SubDiv = (props) => {
    const { className, children } = props
    return (
        <div className={`${className} w-full flex flex-row px-4`}>{children}</div>
    )

}

export default SubDiv