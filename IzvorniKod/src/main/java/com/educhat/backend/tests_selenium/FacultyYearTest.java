package com.educhat.backend.tests_selenium;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.time.Duration;
import java.util.List;

public class FacultyYearTest {

    WebDriver driver;

    private final LoginTest loginTest = new LoginTest();

    @BeforeEach
    public void setup(){

        driver = new ChromeDriver();
        loginTest.driver = driver;
    }


    @Test
    public void createFacultyYearTest_createYearTest(){
        loginTest.loginTest_successfullLogin();

        List<WebElement> menus = driver.findElements(By.className("ant-menu-submenu"));
        WebElement facultiesMenu = menus.get(0);


        facultiesMenu.click();


        WebElement facultyMenuFacultyItem = facultiesMenu.findElement(
                By.xpath(
                        "//*[text()='FER']"
                )
        );
        facultyMenuFacultyItem.click();

        WebElement createFacultyYearButton = driver.findElement(
                By.xpath(
                        "//*[text()='+ Add Year']"
                )
        );

        createFacultyYearButton.click();
        WebElement createFacultyYearInput = driver.findElement(
                By.className("ant-input")
        );

        createFacultyYearInput.sendKeys("New Faculty Year");

        WebElement createFacultyYearSaveButton = driver.findElement(By.className("ant-input-suffix"));
        createFacultyYearSaveButton.click();

        driver.findElement(By.xpath("//*[text()='New Faculty Year']"));
    }

    @Test
    public void createFacultyYearTest_cancelYearCreationTest() {
        loginTest.loginTest_successfullLogin(); // Ensure this test has proper waits in place

        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(1)); // Adjust the wait time as needed

        // Wait for and click on the faculties menu
        WebElement facultiesMenu = wait.until(ExpectedConditions.elementToBeClickable(
                By.className("ant-menu-submenu")
        ));
        facultiesMenu.click();

        // Wait for and click on the specific faculty item (e.g., FER)
        WebElement facultyMenuFacultyItem = wait.until(ExpectedConditions.elementToBeClickable(
                By.xpath("//*[text()='FER']")
        ));
        facultyMenuFacultyItem.click();

        // Wait for and click on the "Add Year" button
        WebElement createFacultyYearButton = wait.until(ExpectedConditions.elementToBeClickable(
                By.xpath("//*[text()='+ Add Year']")
        ));
        createFacultyYearButton.click();

        // Wait for and click on the cancel/save button
        WebElement createFacultyYearSaveButton = wait.until(ExpectedConditions.elementToBeClickable(
                By.className("ant-input-suffix")
        ));
        createFacultyYearSaveButton.click();

        // Optionally, assert that the action was canceled or verify any UI feedback
    }

    @Test
    public void facultyYearTest_deleteFacultyYearTest(){
        loginTest.loginTest_successfullLogin();

        List<WebElement> menus = driver.findElements(By.className("ant-menu-submenu"));
        WebElement facultiesMenu = menus.get(0);

        facultiesMenu.click();

        WebElement facultyMenuFacultyItem = facultiesMenu.findElement(
                By.xpath(
                        "//*[text()='FER']"
                )
        );

        facultyMenuFacultyItem.click();

      WebElement yearForDeletion = driver.findElement(
              By.name("delete-faculty-year")
      );

      yearForDeletion.click();
    }

}
