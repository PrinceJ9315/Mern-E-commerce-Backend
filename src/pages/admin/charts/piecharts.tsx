import { useSelector } from "react-redux";
import AdminSidebar from "../../../components/admin/AdminSidebar";
import { DoughnutChart, PieChart } from "../../../components/admin/Charts";
import { RootState } from "../../../redux/store";
import dashboardApi from "../../../redux/api/dashboardAPI";
import { Skeleton } from "../../../components/loader";
import { Navigate } from "react-router-dom";

const { usePieQuery } = dashboardApi;

const PieCharts = () => {
  const { user } = useSelector((state: RootState) => state.userReducer);
  const { isLoading, data,  isError } = usePieQuery(user?._id || "");

  // Default values for charts data
  const order = data?.charts?.orderFullfillment || { processing: 0, shipped: 0, delivered: 0 };
  const categories = Array.isArray(data?.charts?.productCategories) ? data.charts.productCategories : [];
  const stock = data?.charts?.stockAvailability || { inStock: 0, outOfStock: 0 };
  const revenue = data?.charts?.revenueDistribution || { marketingCost: 0, discount: 0, burnt: 0, productionCost: 0, netMargin: 0 };
  const ageGroup = data?.charts?.usersAgeGroup || { teen: 0, adult: 0, old: 0 };
  const adminCustomer = data?.charts?.adminCustomer || { admin: 0, customer: 0 };

  if (isError) return <Navigate to={"/admin/dashboard"} />;

  return (
    <div className="admin-container">
      <AdminSidebar />
      <main className="chart-container">
        <h1>Pie & Doughnut Charts</h1>
        {isLoading ? (
          <Skeleton length={20} />
        ) : data ? (
          <>
            <section>
              <div>
                <PieChart
                  labels={["Processing", "Shipped", "Delivered"]}
                  data={[order.processing, order.shipped, order.delivered]}
                  backgroundColor={[
                    `hsl(110,80%, 80%)`,
                    `hsl(110,80%, 50%)`,
                    `hsl(110,40%, 50%)`,
                  ]}
                  offset={[0, 0, 50]}
                />
              </div>
              <h2>Order Fulfillment Ratio</h2>
            </section>

            <section>
              <div>
                <DoughnutChart
                  labels={categories.map((i) => Object.keys(i)[0])}
                  data={categories.map((i) => Object.values(i)[0])}
                  backgroundColor={categories.map((i) =>
                    `hsl(${Object.values(i)[0] * 4}, ${Object.values(i)[0]}%, 50%)`
                  )}
                  legends={false}
                  offset={[0, 0, 0, 80]}
                />
              </div>
              <h2>Product Categories Ratio</h2>
            </section>

            <section>
              <div>
                <DoughnutChart
                  labels={["In Stock", "Out Of Stock"]}
                  data={[stock.inStock, stock.outOfStock]}
                  backgroundColor={["hsl(269,80%,40%)", "rgb(53, 162, 255)"]}
                  legends={false}
                  offset={[0, 80]}
                  cutout={"70%"}
                />
              </div>
              <h2>Stock Availability</h2>
            </section>

            <section>
              <div>
                <DoughnutChart
                  labels={[
                    "Marketing Cost",
                    "Discount",
                    "Burnt",
                    "Production Cost",
                    "Net Margin",
                  ]}
                  data={[
                    revenue.marketingCost,
                    revenue.discount,
                    revenue.burnt,
                    revenue.productionCost,
                    revenue.netMargin,
                  ]}
                  backgroundColor={[
                    "hsl(110,80%,40%)",
                    "hsl(19,80%,40%)",
                    "hsl(69,80%,40%)",
                    "hsl(300,80%,40%)",
                    "rgb(53, 162, 255)",
                  ]}
                  legends={false}
                  offset={[20, 30, 20, 30, 80]}
                />
              </div>
              <h2>Revenue Distribution</h2>
            </section>

            <section>
              <div>
                <PieChart
                  labels={[
                    "Teenager (Below 20)",
                    "Adult (20-40)",
                    "Older (Above 40)",
                  ]}
                  data={[ageGroup.teen, ageGroup.adult, ageGroup.old]}
                  backgroundColor={[
                    `hsl(10, ${80}%, 80%)`,
                    `hsl(10, ${80}%, 50%)`,
                    `hsl(10, ${40}%, 50%)`,
                  ]}
                  offset={[0, 0, 50]}
                />
              </div>
              <h2>Users Age Group</h2>
            </section>

            <section>
              <div>
                <DoughnutChart
                  labels={["Admin", "Customers"]}
                  data={[adminCustomer.admin, adminCustomer.customer]}
                  backgroundColor={[
                    `hsl(335, 100%, 38%)`,
                    "hsl(44, 98%, 50%)",
                  ]}
                  offset={[0, 50]}
                />
              </div>
              <h2>Admin vs Customers</h2>
            </section>
          </>
        ) : (
          <div>Error fetching data</div>
        )}
      </main>
    </div>
  );
};

export default PieCharts;
