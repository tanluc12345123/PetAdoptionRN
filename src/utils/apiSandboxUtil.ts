import axios from "axios"
import { CLIENT_ID, SECRET } from '../data/network/index';
import { Buffer } from 'buffer'

export const apiSandBox = {
    callApiSandBox: () => {
        const token = `${CLIENT_ID}:${SECRET}`
        const encodedToken = Buffer.from(token).toString('base64');
        return axios.post('https://api.sandbox.paypal.com/v1/oauth2/token',
            {
                grant_type: 'client_credentials',
            },
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    Authorization: `Basic ${encodedToken}`
                },
            },
        )
    },
    callApiSandboxPayment: async (token: string, dataDetail: any) => {
        return axios
            .post(
                'https://api.sandbox.paypal.com/v1/payments/payment',
                dataDetail,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                },
            )
    },
    callApiSandboxPaymentExecute: (payerID: string | null, paymentId: string | null, accessToken: string) => {
        return axios
            .post(
                `https://api.sandbox.paypal.com/v1/payments/payment/${paymentId}/execute`,
                { payer_id: payerID },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${accessToken}`,
                    },
                },
            )
    }
}
