const nav = document.querySelector(".nav-container");
nav.innerHTML = `
  <nav class="navbar bg-dark border-bottom border-body" data-bs-theme="dark">
  <div class="container-fluid"> <a class="navbar-brand" href="index.html">WT</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation"> <span class="navbar-toggler-icon"></span> </button>
    <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
      <div class="offcanvas-header">
        <h5 class="offcanvas-title" id="offcanvasNavbarLabel">WT</h5>
        <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>
      <div class="offcanvas-body">
        <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
          <li class="nav-item"> <a class="nav-link" aria-current="page" href="index.html">Day</a> </li>
          <li class="nav-item"> <a class="nav-link" href="week.html">Week</a> </li>
          <li class="nav-item"> <a class="nav-link" href="yearly.html">Weekly Totals</a> </li>
          <li class="nav-item"> <a class="nav-link" href="weight.html">Weight</a> </li>
          <li class="nav-item"> <a class="nav-link" href="Boosters.html">Energy</a> </li>
          <li class="nav-item"> <a class="nav-link" href="list.html">To-do</a> </li>
          <li class="nav-item"> <a class="nav-link" href="solver.html">Groceries</a> </li>
        </ul>
      </div>
    </div>
  </div>
</nav>
`;