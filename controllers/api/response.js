module.exports = { respond };

async function respond(req, res, dispatch = () => {})
{
  try
  {
    const json = await dispatch(req, res);
    // console.log("Response: ", json);
    res.status(200).json(json);
  } catch (exception)
  {
    console.error(exception, exception.message);
    res.status(400).json({ msg: exception.message });
  }
}
