package com.educhat.backend.tests_selenium;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;

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
    public void createFacultyYearTest_cancelYearCreationTest(){
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

        WebElement createFacultyYearSaveButton = driver.findElement(By.className("ant-input-suffix"));
        createFacultyYearSaveButton.click();
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
