package com.educhat.backend.tests_selenium;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;

import java.time.Duration;
import java.util.List;

public class CreateSubjectPostTest {
    WebDriver driver;

    private final LoginTest loginTest = new LoginTest();

    @BeforeEach
    public void setup(){
        driver = new ChromeDriver();
        loginTest.driver = driver;
    }

    @Test
    public void createSubjectPostTest_createSubjectPost(){
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

        WebElement facultyYearButton = driver.findElement(By.xpath(
                "//*[text()='New Faculty Year']"
        ));
        facultyYearButton.click();

        WebElement facultySubjectButton = driver.findElement(By.xpath(
                "//*[text()='FER Faculty Subject']"
        ));

        facultySubjectButton.click();

        WebElement createSubjectPostButton = driver.findElement(By.xpath(
                "//*[text()='Create']"
        ));

        createSubjectPostButton.click();

        WebElement modal = driver.findElement(By.className("ant-modal-content"));


        WebElement postHeader = modal.findElement(By.cssSelector("input"));
        WebElement postDescription = modal.findElement(By.cssSelector("textarea"));

        postHeader.sendKeys("New Post Header");
        postDescription.sendKeys("New Post Description");

        WebElement createPost = modal.findElement(By.xpath(
                "//*[text()='Create']"
        ));

        driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(3));

        createPost.click();
    }
}
