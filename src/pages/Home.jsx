import { useEffect, useState } from 'react';
import Header from '../components/Header';
import CardPizza from '../components/CardPizza';
import { pizzas as localPizzas } from '../data/pizzas';

const Home = () => {
  const [pizzas, setPizzas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getPizzas = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/pizzas');

        if (!response.ok) {
          throw new Error('No se pudo obtener la información desde la API');
        }

        const data = await response.json();
        setPizzas(data);
      } catch (error) {
        console.error('Error al obtener pizzas, se usarán datos locales:', error);
        setPizzas(localPizzas);
      } finally {
        setLoading(false);
      }
    };

    getPizzas();
  }, []);

  return (
    <main className="flex-grow-1">
      <Header />

      <section className="container py-5">
        {loading ? (
          <p className="text-center fs-5">Cargando pizzas...</p>
        ) : (
          <div className="row g-4">
            {pizzas.map((pizza) => (
              <div className="col-12 col-md-6 col-lg-4" key={pizza.id}>
                <CardPizza
                  id={pizza.id}
                  name={pizza.name}
                  price={pizza.price}
                  ingredients={pizza.ingredients}
                  img={pizza.img}
                />
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
};

export default Home;
