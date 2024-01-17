module.exports = { respond };

async function respond(req, res, dispatch = () => {})
{
  try
  {
    const json = await dispatch(req, res);
    res.status(200).json(json);
  } catch (exception)
  {
    console.error(exception);
    res.status(400).json({ msg: exception.message });
  }
}
