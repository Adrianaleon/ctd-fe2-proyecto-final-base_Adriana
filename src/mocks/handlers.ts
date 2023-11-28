import { API_URL } from "../app/constants";
import { allResults, results } from "./dataMock";
import { rest } from "msw"



export const handlers = [
    rest.get(API_URL, (req, res, ctx) => {
     const characterParams = req.url.searchParams.get('character');
     if (characterParams) {
        return res (
            ctx.status(200),
            ctx.json({
                results:results
            })
        )
     } 
     return res (
        ctx.status(200),
        ctx.json({
            results:allResults
        })
     )

    })
]