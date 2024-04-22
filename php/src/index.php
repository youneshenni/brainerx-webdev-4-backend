<?php
// print_r(phpinfo());
session_start();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $_SESSION['name'] = $_POST['name'];
}
if (isset($_POST['destroy'])) {
    session_destroy();
    session_start();
}
if (isset($_SESSION['name'])) {
    echo 'Hello ' . $_SESSION['name'];
} else {
    echo 'Hello guest';
}
?>



<form method="post" action="/">
    <input type="text" name="name" />
    <input type="submit" value="Submit" />

</form>

<!-- Destroy session on button click -->
<form method="post" action="/">
    <input type="hidden" name="destroy" value="1" />
    <input type="submit" value="Destroy" />
</form>

<?php print_r($_SESSION); ?>