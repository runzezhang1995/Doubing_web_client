import express from 'express';
import fs from 'fs';


const router = express.Router();



router.get('/queryImageList', (req, res) => {
    res.send({
        success:true,
        list: getQueryList()
    })
});


function getQueryList(){
    const results = [];
    const rootAddr = './public/market/query/';
    const list = fs.readdirSync(rootAddr);
    list.forEach(qfolder => {
        const folderAddr = rootAddr + qfolder;
        const imgs = fs.readdirSync(folderAddr);
        imgs.forEach(img => {
            const addr = qfolder + '/' + img;
            results.push(addr);
        });
    });
    return results;

}


export default router;