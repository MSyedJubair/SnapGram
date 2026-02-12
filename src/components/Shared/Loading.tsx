import { Spinner } from "../ui/spinner"

const Loading = (text = 'Loading...') => {
    return (
        <div className="flex-center w-full h-full">
            <Spinner />
            <p className="text-small-regular">{text}</p>
        </div>
    )
}

export default Loading