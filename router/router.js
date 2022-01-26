const router = require('express').Router();

const { nanoid } = require('nanoid');
const yup = require('yup')




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
        }
        slug = slug.toLowerCase();
        res.json({ slug, url })
    } catch (error) {
        next(error)
    }
});






module.exports = router;