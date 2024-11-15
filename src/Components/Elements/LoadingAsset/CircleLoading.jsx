import { CircularProgress } from "@mui/material"

const CircleLoading = (props) => {
    const { isLoading = false, size = 30, thickness = 5, color = 'inherit' } = props
    return (
        isLoading ? (
            <CircularProgress size={size} thickness={thickness} color={color} />
        ) : ("")
    )
}

export { CircleLoading }