import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import { Session } from 'next-auth';
import { getSession } from 'next-auth/react';

type ApiHandlerWithSession<T = any> = (
  req: NextApiRequest,
  res: NextApiResponse<T>,
  session: Session
) => void | Promise<void>;

function withAuth(apiHandler: ApiHandlerWithSession) {
  const handler: NextApiHandler = async (req, res) => {
    const session = await getSession({ req });
    if (session) {
      apiHandler(req, res, session);
    } else {
      res.status(401).end();
      return;
    }
  };

  return handler;
}

export default withAuth;
