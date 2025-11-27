import http from 'http'
import { Transform } from 'node:stream'

class InverseNumberStream extends Transform {
    _transform(chunk, econding, callback){
        const tranformed = Number(chunk.toString()) * -1

        console.log(tranformed)

        callback(null, Buffer.from(String(tranformed)))
    }
}

const server = http.createServer(async(req, res) => {
    const buffers = []

    for await (const chunk of req){
        buffers.push(chunk)
    }

    const fullStreamContent = Buffer.concat(buffers).toString()

    return res.end(fullStreamContent)

    // return req
    //    .pipe(new InverseNumberStream())
    //    .pipe(res)
})

server.listen(3334)