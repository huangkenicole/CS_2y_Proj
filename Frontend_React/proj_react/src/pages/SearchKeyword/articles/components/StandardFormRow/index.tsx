import classNames from 'classnames';
import React from 'react';
import useStyles from './index.style';
type StandardFormRowProps = {
  title?: string;
  last?: boolean;
  block?: boolean;
  grid?: boolean;
  children?: React.ReactNode;
  style?: React.CSSProperties;
};
const StandardFormRow: React.FC<StandardFormRowProps> = ({
  title,
  children,
  last,
  block,
  grid,
  ...rest
}) => {
  const { styles } = useStyles();
  const cls = classNames(styles.standardFormRow, {
    [styles.standardFormRowBlock]: block,
    [styles.standardFormRowLast]: last,
    [styles.standardFormRowGrid]: grid,
  });
  return (
    <div className={cls} {...rest}>
      {title && (
        <div className={styles.label}>
          <span>{title}</span>
        </div>
      )}
      <div className={styles.content}>{children}</div>
    </div>
  );
};
export default StandardFormRow;




// import classNames from 'classnames';
// import React from 'react';
// import { Input } from 'antd';
// import useStyles from './index.style';
//
// const { Search } = Input;
//
// type StandardFormRowProps = {
//   title?: string;
//   last?: boolean;
//   block?: boolean;
//   grid?: boolean;
//   children?: React.ReactNode;
//   onSearch?: (value: string) => void; // Add an onSearch prop
//   style?: React.CSSProperties;
// };
//
// const StandardFormRow: React.FC<StandardFormRowProps> = ({
//   title,
//   children,
//   last,
//   block,
//   grid,
//   onSearch, // Destructure the onSearch prop
//   ...rest
// }) => {
//   const { styles } = useStyles();
//   const cls = classNames(styles.standardFormRow, {
//     [styles.standardFormRowBlock]: block,
//     [styles.standardFormRowLast]: last,
//     [styles.standardFormRowGrid]: grid,
//   });
//
//   return (
//     <div className={cls} {...rest}>
//       {title && (
//         <div className={styles.label}>
//           <span>{title}</span>
//         </div>
//       )}
//       <div className={styles.content}>
//         {children || (
//           <Search
//             placeholder="Input search text"
//             onSearch={onSearch}
//             style={{ width: 200 }}
//           />
//         )}
//       </div>
//     </div>
//   );
// };
//
// export default StandardFormRow;
