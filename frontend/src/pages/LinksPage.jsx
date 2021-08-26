import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import PageContainer from "../components/PageContainer";
import { addLink, getLinks } from "../store/actions";

const LinksPage = () => {
  const dispatch = useDispatch();
  const links = useSelector((state) => state.links.links);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await dispatch(addLink(data));
      dispatch(getLinks(""));
    } catch (err) {
      console.log(err.message);
    }
  };

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
      <form className="mb-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="field is-horizontal">
          <div className="field-body">
            <div className="field">
              <div className="control">
                <input
                  className="input "
                  type="text"
                  placeholder="Title"
                  {...register("title", { required: true })}
                />
              </div>
            </div>
            <div className="field">
              <div className="control">
                <input
                  className="input "
                  type="text"
                  placeholder="Link"
                  {...register("link", { required: true })}
                />
              </div>
            </div>
            <button className="button is-success">Add</button>
          </div>
        </div>
      </form>
      <table className="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
        <thead>
          <tr>
            <th style={{ width: "20%" }}># ID</th>
            <th># Link</th>
          </tr>
        </thead>
        <tbody>{renderRows()}</tbody>
      </table>
    </PageContainer>
  );
};

export default LinksPage;
