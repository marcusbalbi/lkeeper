import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PageContainer from "../components/PageContainer";
import { getLinks } from "../store/actions";

const SearchLinkPage = () => {
  const dispatch = useDispatch();
  const links = useSelector((state) => state.links.links);

  useEffect(() => {
    dispatch(getLinks(""));
  }, [dispatch]);

  const renderRows = () => {
    return links.map((link) => {
      return (
        <tr key={link.id}>
          <td>{link.id}</td>
          <td>
            <a rel="noreferrer" target="_blank" href={link.link}>
              {link.title}
            </a>
          </td>
        </tr>
      );
    });
  };

  return (
    <PageContainer>
      <form className="mb-4">
        <div className="field is-horizontal">
          <div className="field-body">
            <div className="field">
              <div className="control">
                <input className="input " type="text" placeholder="Title" />
              </div>
            </div>
            <div className="field">
              <div className="control">
                <input className="input " type="text" placeholder="Link" />
              </div>
            </div>
            <button className="button is-success">Add</button>
          </div>
        </div>
      </form>
      <table className="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
        <th># ID</th>
        <th># Link</th>
        {renderRows()}
      </table>
    </PageContainer>
  );
};

export default SearchLinkPage;
