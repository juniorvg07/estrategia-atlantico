import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "../styles/TableNormal.css";
import "../styles/SkeletonTable.css";
import "react-loading-skeleton/dist/skeleton.css";

export const loader = () => {
  return (
    <SkeletonTheme
      color="var(--gris-fuerte)"
      highlightColor="var(--azul-suave)"
    >
      <div className="skeleton-container">
        <table className="skeleton-table">
          <thead className="skeleton-header">
            <tr>
              <th className="skeleton-rowHead">
                <Skeleton />
              </th>
              <th className="skeleton-rowHead">
                <Skeleton />
              </th>
              <th className="skeleton-rowHead">
                <Skeleton />
              </th>
              <th className="skeleton-rowHead">
                <Skeleton />
              </th>
              <th className="skeleton-rowHead">
                <Skeleton />
              </th>
              <th className="skeleton-rowHead">
                <Skeleton />
              </th>
              <th className="skeleton-rowHead">
                <Skeleton />
              </th>
              <th className="skeleton-rowHead">
                <Skeleton />
              </th>
              <th className="skeleton-rowHead">
                <Skeleton />
              </th>
              <th className="skeleton-rowHead">
                <Skeleton />
              </th>
            </tr>
          </thead>
          <tbody className="skeleton-body">
            <tr>
              <td>
                <Skeleton count={10} />
              </td>
              <td>
                <Skeleton count={10} />
              </td>
              <td>
                <Skeleton count={10} />
              </td>
              <td>
                <Skeleton count={10} />
              </td>
              <td>
                <Skeleton count={10} />
              </td>
              <td>
                <Skeleton count={10} />
              </td>
              <td>
                <Skeleton count={10} />
              </td>
              <td>
                <Skeleton count={10} />
              </td>
              <td>
                <Skeleton count={10} />
              </td>
              <td>
                <Skeleton count={10} />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </SkeletonTheme>
  );
};
