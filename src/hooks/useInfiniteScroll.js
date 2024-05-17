import { useEffect, useState } from "react"

export const useInfiniteScroll = (fetchFn) => {
    const [latestPage, setLatestPage] = useState(1);
    const [cumulativeData, setCumulativeData] = useState([]);

    useEffect(() => {
        fetchFn();
    }, [latestPage]);

    return {cumulativeData, setCumulativeData, latestPage, setLatestPage}
}