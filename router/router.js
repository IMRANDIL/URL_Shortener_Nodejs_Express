const router = require('express').Router();

const { nanoid } = require('nanoid');
const yup = require('yup')

const monk = require('monk')
const db = monk(process.env.URI);


const urls = db.get('urls');

urls.createIndex('name');










//post.....
const schema = yup.object().shape({
    slug: yup.string().trim().matches(/[\w\-]/i),
    url: yup.string().trim().url().required(),
})


router.post('/url', async (req, res, next) => {
    //Todo: create a shortUrl
    let { slug, url } = req.body;
    try {

        await schema.validate({
            slug,
            url
        })

        if (!slug) {
            slug = nanoid(5);
        } else {
            const exitsting = await urls.findOne({ slug });
            if (exitsting) {
                throw new Error('Slug in Use.😚')
            }
        }
        slug = slug.toLowerCase();

        const newUrl = {
            url,
            slug,


        };

        const created = await urls.insert(newUrl);

        res.json(created)
    } catch (error) {
        next(error)
    }
});






module.exports = router;