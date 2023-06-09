const router = require('express').Router();
const { blogpost } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
  try {
    const newblogpost = await blogpost.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newblogpost);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const blogpostData = await blogpost.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!blogpostData) {
      res.status(404).json({ message: 'No blogpost found with this id!' });
      return;
    }

    res.status(200).json(blogpostData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
