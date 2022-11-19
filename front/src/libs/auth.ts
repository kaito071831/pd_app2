import { GetServerSideProps } from "next";

export const withAuthServerSideProps = (url: string): GetServerSideProps => {
  return async (context) => {
    const {req, res} = context;
    const authURI: string = process.env.API_ORIGIN;
    const response: Response = await fetch(`${authURI}/${url}`, {
      headers: {
        "Content-Type": "application/json",
        uid: req.cookies["uid"],
        client: req.cookies["client"],
        "access-token": req.cookies["access-token"],
      },
    });

    if(!response.ok && response.status == 401){
      return {
        redirect: {
          destination: "/sign_in",
          permanent: false,
        },
      };
    }

    const props: any = await response.json();
    return{
      props: {
        data: props
      } 
    };
  };
};
