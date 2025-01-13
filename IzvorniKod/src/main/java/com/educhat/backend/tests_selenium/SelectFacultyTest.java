package com.educhat.backend.tests_selenium;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;

import java.util.List;


public class SelectFacultyTest {

    WebDriver driver;

    private final LoginTest loginTest = new LoginTest();

    @BeforeEach
    public void setup(){

        driver = new ChromeDriver();
        loginTest.driver = driver;
    }
    @Test
    public void selectFacultyTest_selectFacultyAsUser(){
        loginTest.loginTest_successfullLogin();

        WebElement selectFacultyButton = driver.findElement(
                By.xpath("//*[text()='Add faculty']")
        );

        selectFacultyButton.click();
        List<WebElement> checkboxList = driver.findElements(By.className("ant-checkbox"));
        WebElement facultyElementFirst = checkboxList.get(0);
        WebElement facultyElementSecond = checkboxList.get(1);

        facultyElementFirst.click();
        facultyElementSecond.click();

        List<WebElement> toggleFacultyRoleButtons = driver.findElements(By.xpath("//*[text()='Admin']"));
        WebElement facultyRoleFirst = toggleFacultyRoleButtons.get(0);

        facultyRoleFirst.click();

        WebElement saveButton = driver.findElement(
                By.xpath("//*[text()='Save']")
        );

        saveButton.click();


    }

    @Test
    public void selectFacultyTest_saveCancelCloseWithoutSelection(){
        loginTest.loginTest_successfullLogin();

        WebElement selectFacultyButton = driver.findElement(
                By.xpath("//*[text()='Add faculty']")
        );

        selectFacultyButton.click();

        WebElement saveFacultySelectionButton = driver.findElement(
                By.xpath("//*[text()='Save']")
        );

        saveFacultySelectionButton.click();

        selectFacultyButton = driver.findElement(
                By.xpath("//*[text()='Add faculty']")
        );

        selectFacultyButton.click();

        WebElement cancelFacultySelectionButton = driver.findElement(
                By.xpath("//*[text()='Cancel']")
        );

        cancelFacultySelectionButton.click();

        selectFacultyButton = driver.findElement(
                By.xpath("//*[text()='Add faculty']")
        );

        selectFacultyButton.click();

        WebElement closeFacultySelectionButton = driver.findElement(
                By.className("ant-modal-close-x")
        );
        closeFacultySelectionButton.click();
    }

    @Test
    public void selectFacultyTest_searchingTest(){
        loginTest.loginTest_successfullLogin();

        WebElement selectFacultyButton = driver.findElement(
                By.xpath("//*[text()='Add faculty']")
        );

        selectFacultyButton.click();

        WebElement searchInput = driver.findElement(By.className("ant-input"));
        searchInput.sendKeys("FER");

        driver.findElement(By.className("ant-checkbox"));

    }
}
