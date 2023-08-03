const HomeLayout = ({children}) => {
  return (
      <div>
          Notre nouveau layout est la
          <div>
              {children}
          </div>
      </div>
  );
}

export default HomeLayout;