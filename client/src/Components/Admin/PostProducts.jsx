import { useNavigate } from "react-router-dom";
import { Container, Form, Button } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import { useFormik } from "formik";
import { postProduct } from "../../redux/actions/petshopActions";
import NavBar from "../NavBar/NavBarShop";
import Footer from "../Footer/Footer";
import { Widget } from "@uploadcare/react-widget";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";

export default function PutProduct() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: '',
      category: '',
      price: 0,
      profilePicture: [],
      targetAnimal: '',
      tradeMark: '',
      weight: null,
      isActive: true,
    },
    onSubmit: (formData) => {
      Swal.fire({
        title: `Confirme que desea agregar ${formData.name}`,
        showDenyButton: true,
        confirmButtonText: 'Confirmar',
        denyButtonText: `Descartar`,
      }).then(async (result) => {
        if (result.isConfirmed) {
          Swal.fire(`${formData.name} ya se encuentra en el shop`, '', 'success')
          dispatch(postProduct(formData));
          navigate('/admin/listado-productos')
        } else if (result.isDenied) {
          Swal.fire(`${formData.name} aún no está en el shop :( `, '', 'info')
        }
      })
    },
  });

  function backToTheList() {
    navigate('/admin/listado-productos')
  }

  const categoriesOptions = [
    { key: "alimento", value: "alimento", text: "alimento" }, { key: "accesorios", value: "accesorios", text: "accesorios" }, { key: "salud y bienestar", value: "salud y bienestar", text: "salud y bienestar" }
  ];

  const targetAnimalOptions = [
    { key: "perro", value: "perro", text: "perro" }, { key: "gato", value: "gato", text: "gato" }, { key: "tortuga", value: "tortuga", text: "tortuga" }, { key: "conejo", value: "conejo", text: "conejo" }, { key: "pez", value: "pez", text: "pez" }, { key: "hamster", value: "hamster", text: "hamster" }, { key: "pajaro", value: "pajaro", text: "pajaro" }, { key: "otro", value: "otro", text: "otro" }
  ];

  const tradeMarkOptions = [
    { key: "pro plan", value: "pro plan", text: "pro plan" }, { key: "pedigree", value: "pedigree", text: "pedigree" }, { key: "vital can", value: "vital can", text: "vital can" }, { key: "eukanuba", value: "eukanuba", text: "eukanuba" }
  ];

  return (
    <div>
      <NavBar />
      <Container>
        <div >
          <h2>AGREGAR NUEVO PRODUCTO AL PETSHOP</h2>

          <Form onSubmit={formik.handleSubmit}>
            <div >
              <Form.Input
                type="string"
                placeholder="Nombre del producto"
                name="name"
                onChange={formik.handleChange}
              ></Form.Input>

              <Form.Dropdown
                placeholder="Categoría"
                options={categoriesOptions}
                onChange={(e) => {
                  e.target.value = e.target.firstChild.textContent
                  e.target.name = "category"
                  formik.handleChange(e)
                }}
                selection={true}
              ></Form.Dropdown>

              <Form.Input
                type="number"
                placeholder="Precio"
                name="price"
                onChange={formik.handleChange}

              ></Form.Input>

              <Form.Input
                type="number"
                placeholder="Stock"
                name="stock"
                onChange={formik.handleChange}
              ></Form.Input>

              <Form.Dropdown
                placeholder="Animal"
                options={targetAnimalOptions}
                onChange={(e) => {
                  e.target.value = e.target.firstChild.textContent
                  e.target.name = "targetAnimal"
                  formik.handleChange(e)
                }}
                selection={true}

              ></Form.Dropdown>

              <Form.Input
                type="text"
                placeholder="Descripción"
                name="description"
                onChange={formik.handleChange}
              ></Form.Input>

              <Form.Input
                type="number"
                placeholder="Peso (para alimentos)"
                name="weight"
                onChange={formik.handleChange}

              ></Form.Input>

              <Form.Dropdown
                placeholder="Marca"
                options={tradeMarkOptions}
                onChange={(e) => {
                  e.target.value = e.target.firstChild.textContent
                  e.target.name = "tradeMark"
                  formik.handleChange(e)
                }}
                selection={true}
              ></Form.Dropdown>

              <Widget
                publicKey='269841dc43864e62c49d'
                id='file'
                name="profilePicture"
                onChange={(e) => {
                  formik.values.profilePicture.push(e.originalUrl)
                  console.log(formik)
                }}
                product="profilePicture"
              />
              <Button onClick={backToTheList}>REGRESAR AL LISTADO</Button>
              <Button type="submit">AGREGAR</Button>
            </div>
          </Form>
        </div>
      </Container>
      <Footer />
    </div>
  );
}