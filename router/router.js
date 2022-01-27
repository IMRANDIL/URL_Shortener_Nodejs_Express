const router = require('express').Router();

const { nanoid } = require('nanoid');
const yup = require('yup')

const monk = require('monk')
const db = monk(process.env.URI);


const urls = db.get('urls');


urls.createIndex({ slug: 1 }, { unique: true })










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
                throw new Error('Slug in Use.😅')
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


//get....

router.get('/:id', async (req, res, next) => {
    const { id: slug } = req.params;
    try {
        const url = await urls.findOne({ slug });
        if (url) {
            return res.redirect(url.url)
        }
        res.redirect(`/?error=${slug} not found`)
    } catch (error) {
        res.redirect(`/?error=Link not Found`)
    }
})



module.exports = router;