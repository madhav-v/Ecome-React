import React from "react";
import { Container, Breadcrumb, Card, Row, Col } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";
import { NavLink, Link } from "react-router-dom";

import DataTable from "react-data-table-component";

import { useCallback, useEffect, useState } from "react";
import { customStyles } from "../../../assets/css/table";
import { toast } from "react-toastify";
import category from ".";
import { TableActionButtons } from "../../../components/table-action.component";

const CategoryListPage = () => {
  const handleDelete = async (id) => {
    try {
      setLoading(true);
      let response = await category.categorySvc.deleteCategoryById(id);
      if (response.status) {
        toast.success(response.msg);
        await loadCategories();
      }
    } catch (exception) {
      toast.error("Error while deleting Category");
    }
  };
  const columns = [
    {
      name: "Title",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Sub-cat of",
      selector: (row) => {
        return row.parent ? row.parent.name : "-";
      },
      sortable: true,
    },
    {
      name: "Brands",
      selector: (row) => {
        return row.brands
          ? row.brands.map((brand) => brand.name).join(",")
          : "-";
      },
      sortable: true,
    },
    {
      name: "Image",
      selector: (row) => row.image,
    },
    {
      name: "Status",
      selector: (row) => row.status,
      sortable: true,
    },
    {
      name: "Action",
      selector: (row) => (
        <TableActionButtons
          editurl={"/admin/category/" + row._id}
          id={row._id}
          deleteAction={handleDelete}
        />
      ),
    },
  ];

  let [categoryList, setCategoryList] = useState();
  let [pagination, setPagination] = useState({
    currentPage: 1,
    perPage: 10,
    totalNoOfRows: 0,
  });
  let [loading, setLoading] = useState(true);

  const loadCategories = useCallback(async (perPage = 10, page = 1) => {
    try {
      let response = await category.categorySvc.listAllCategories(
        perPage,
        page
      );
      if (response.status) {
        setCategoryList(response.result);
        setPagination(response.meta);
      }
    } catch (exception) {
      console.log("Baner Fetch Exception: ", exception);
      toast.error("Error while fetching category");
    } finally {
      setLoading(false);
    }
  }, []);

  const handlePageChange = (page) => {
    loadCategories(pagination.perPage, page);
  };

  const handlePerRowsChange = (perPage, page) => {
    loadCategories(perPage, page);
  };

  useEffect(() => {
    loadCategories();
  }, []);

  return (
    <>
      <Container fluid className="px-4">
        <Row>
          <Col sm={6}>
            <h1 className="mt-4">Category List </h1>
          </Col>
          <Col sm={6} className="mt-5">
            <NavLink
              to="/admin/category/create"
              className={"btn btn-sm btn-success float-end"}
            >
              <FaPlus /> Add Category
            </NavLink>
          </Col>
        </Row>
        <Breadcrumb className="mb-4">
          <li className="breadcrumb-item">
            <Link role="button" className={"breadcrumb-item"} to="/admin">
              Dashboard
            </Link>
          </li>
          <Breadcrumb.Item active>Category List </Breadcrumb.Item>
        </Breadcrumb>

        <Card className="mb-4">
          <Card.Header>
            <h4>Category List </h4>
          </Card.Header>
          <Card.Body>
            <DataTable
              columns={columns}
              data={categoryList}
              pagination
              progressPending={loading}
              dense="dense"
              customStyles={customStyles}
              paginationServer
              responsive="true"
              paginationTotalRows={pagination.totalNoOfRows}
              onChangeRowsPerPage={handlePerRowsChange}
              onChangePage={handlePageChange}
            />
          </Card.Body>
        </Card>
      </Container>
    </>
  );
};

export default CategoryListPage;
