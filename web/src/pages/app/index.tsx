import { gql, useQuery } from "@apollo/client";
import { useUser, withPageAuthRequired } from "@auth0/nextjs-auth0";
import {
  useGetProductsQuery,
  useMeQuery,
} from "../../graphql/generated/graphql";
import {
  getServerPageGetProducts,
  ssrGetProducts,
} from "../../graphql/generated/page";
import { withApollo } from "../../lib/withApollo";

export function Home({ data }) {
  const { user } = useUser();
  const { data: me } = useMeQuery();

  return (
    <div className="text-violet-500">
      <h1>Hello</h1>
      <pre>OK: {JSON.stringify(me, null, 2)}</pre>
      {/* <pre>{JSON.stringify(data.products, null, 2)}</pre> */}
      <pre>{JSON.stringify(user, null, 2)}</pre>

      <a href="/api/auth/logout">Logout</a>
    </div>
  );
}

export const getServerSideProps = withPageAuthRequired({
  getServerSideProps: async (ctx) => {
    return {
      props: {},
    };
  },
});

export default withApollo(ssrGetProducts.withPage()(Home));
