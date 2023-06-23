import { useEffect, useState } from "react";
import orderApi from './../../../../../api/orderApi';

export function useOrderDetail(userId) {
    const [order, setOrder] = useState([]);
    
    useEffect(() => {
        (async () => {
            try {
                const result = await orderApi.getOrder(userId);
                const orderAll = result.orders;
                setOrder(orderAll)
        } catch (error) {
            console.log(error);
        }
        })();
    }, [userId]);

    return { order };
}
