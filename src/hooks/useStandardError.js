import { useCallback } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'

const useStandardError = props => {

    const standardError = useCallback(err => {
        if (!axios.isCancel(err))
            toast.error(err && err.response && err.response.data && err.response.data.error ? err.response.data.error : "Sorry, an error occurred")
    }, [])

    return standardError
}

export default useStandardError