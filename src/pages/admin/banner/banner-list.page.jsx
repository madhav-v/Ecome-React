import React from "react";
import { Container, Breadcrumb, Card, Row, Col } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";
import { NavLink, Link } from "react-router-dom";

import DataTable from "react-data-table-component";

import { useCallback, useEffect, useState } from "react";
import { customStyles } from "../../../assets/css/table";
import { toast } from "react-toastify";
import banner from "./";
import { TableActionButtons } from "../../../components/table-action.component";
const DateFormat = ({ date }) => {
  // Y-m-d
  const numbPadding = (numb) => {
    if (numb < 10) {
      numb = "0" + numb;
    }
    return numb;
  };
  let convertedDate = new Date(date);
  let month = numbPadding(convertedDate.getMonth() + 1);
  let day = numbPadding(convertedDate.getDate());

  let dateFormat = convertedDate.getFullYear() + "-" + month + "-" + day;

  return dateFormat;
};

const BannerListPage = () => {
  const handleDelete = async (id) => {
    try {
      setLoading(true);
      let response = await banner.bannerSvc.deleteBannerById(id);
      if (response.status) {
        toast.success(response.msg);
        await loadBanners();
      }
    } catch (exception) {
      toast.error("Error while deleting Banner");
    }
  };
  const columns = [
    {
      name: "Title",
      selector: (row) => row.title,
      sortable: true,
    },
    {
      name: "Image",
      selector: (row) => row.image,
    },
    {
      name: "Start Date",
      selector: (row) => <DateFormat date={row.startDate} />,
      sortable: true,
    },
    {
      name: "End Date",
      selector: (row) => <DateFormat date={row.endDate} />,
      sortable: true,
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
          editurl={"/admin/banner/" + row._id}
          id={row._id}
          deleteAction={handleDelete}
        />
      ),
    },
  ];

  let [bannerList, setBannerList] = useState();
  let [pagination, setPagination] = useState({
    currentPage: 1,
    perPage: 10,
    totalNoOfRows: 0,
  });
  let [loading, setLoading] = useState(true);

  const loadBanners = useCallback(async (perPage = 10, page = 1) => {
    try {
      let response = await banner.bannerSvc.listAllBanners(perPage, page);
      if (response.status) {
        setBannerList(response.result);
        setPagination(response.meta);
      }
    } catch (exception) {
      console.log("Baner Fetch Exception: ", exception);
      toast.error("Error while fetching banner");
    } finally {
      setLoading(false);
    }
  }, []);

  const handlePageChange = (page) => {
    loadBanners(pagination.perPage, page);
  };

  const handlePerRowsChange = (perPage, page) => {
    loadBanners(perPage, page);
  };

  useEffect(() => {
    loadBanners();
  }, []);

  return (
    <>
      <Container fluid className="px-4">
        <Row>
          <Col sm={6}>
            <h1 className="mt-4">Banner List </h1>
          </Col>
          <Col sm={6} className="mt-5">
            <NavLink
              to="/admin/banner/create"
              className={"btn btn-sm btn-success float-end"}
            >
              <FaPlus /> Add Banner
            </NavLink>
          </Col>
        </Row>
        <Breadcrumb className="mb-4">
          <li className="breadcrumb-item">
            <Link role="button" className={"breadcrumb-item"} to="/admin">
              Dashboard
            </Link>
          </li>
          <Breadcrumb.Item active>Banner List </Breadcrumb.Item>
        </Breadcrumb>

        <Card className="mb-4">
          <Card.Header>
            <h4>Banner List </h4>
          </Card.Header>
          <Card.Body>
            <DataTable
              columns={columns}
              data={bannerList}
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

export default BannerListPage;
