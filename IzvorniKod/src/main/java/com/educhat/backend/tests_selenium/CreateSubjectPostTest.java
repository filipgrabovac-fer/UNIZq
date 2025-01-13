package com.educhat.backend.tests_selenium;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.time.Duration;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertTrue;

public class CreateSubjectPostTest {
    WebDriver driver;

    private final LoginTest loginTest = new LoginTest();

    @BeforeEach
    public void setup(){
        driver = new ChromeDriver();
        loginTest.driver = driver;
    }

    @Test
    public void createSubjectPostTest_createSubjectPost() throws InterruptedException {
        loginTest.loginTest_successfullLogin();
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(1));

        List<WebElement> menus = driver.findElements(By.className("ant-menu-submenu"));
        WebElement facultiesMenu = menus.get(0);
        facultiesMenu.click();
        driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(1));
        WebElement facultyMenuFacultyItem = facultiesMenu.findElement(
                By.xpath(
                        "//*[text()='FER']"
                )
        );
        facultyMenuFacultyItem.click();
        driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(1));

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

        driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(1));

        WebElement createButton = driver.findElement(By.cssSelector("button.w-full.px-2.max-\\[704px\\]\\:leading-none.max-\\[704px\\]\\:p-0.text-\\[16px\\].rounded-\\[20px\\].border-solid.border-2.hover\\:opacity-75.bg-primary.text-white.border-primary"));
        createButton.click();
    }

    @Test
    public void createSubjectPostTest_cancelCreateSubjectPost() throws InterruptedException {
        loginTest.loginTest_successfullLogin();
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(1));

        List<WebElement> menus = driver.findElements(By.className("ant-menu-submenu"));
        WebElement facultiesMenu = menus.get(0);
        facultiesMenu.click();
        driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(1));
        WebElement facultyMenuFacultyItem = facultiesMenu.findElement(
                By.xpath(
                        "//*[text()='FER']"
                )
        );
        facultyMenuFacultyItem.click();
        driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(1));

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

        driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(1));

        WebElement cancel = driver.findElement(By.cssSelector("button.w-full.px-2.max-\\[704px\\]\\:leading-none.max-\\[704px\\]\\:p-0.text-\\[16px\\].rounded-\\[20px\\].border-solid.border-2.hover\\:opacity-75.border-black.bg-white"));
        cancel.click();
    }

    @Test
    public void createSubjectPostTest_withoutPostTitle() throws InterruptedException {
        loginTest.loginTest_successfullLogin();
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(1));

        List<WebElement> menus = driver.findElements(By.className("ant-menu-submenu"));
        WebElement facultiesMenu = menus.get(0);
        facultiesMenu.click();
        driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(1));
        WebElement facultyMenuFacultyItem = facultiesMenu.findElement(
                By.xpath(
                        "//*[text()='FER']"
                )
        );
        facultyMenuFacultyItem.click();
        driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(1));

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

        postDescription.sendKeys("New Post Description");

        driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(1));

        WebElement createButton = driver.findElement(By.cssSelector("button.w-full.px-2.max-\\[704px\\]\\:leading-none.max-\\[704px\\]\\:p-0.text-\\[16px\\].rounded-\\[20px\\].border-solid.border-2.hover\\:opacity-75.bg-primary.text-white.border-primary"));
        createButton.click();

        WebElement findTitleMissing = driver.findElement(By.xpath(
                "//*[text()='Please input the post header!']"
        ));
        driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(1));
        assertTrue(findTitleMissing.isDisplayed());
    }

    @Test
    public void createSubjectPostTest_withoutPostDescription() throws InterruptedException {
        loginTest.loginTest_successfullLogin();
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(1));

        List<WebElement> menus = driver.findElements(By.className("ant-menu-submenu"));
        WebElement facultiesMenu = menus.get(0);
        facultiesMenu.click();
        driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(1));
        WebElement facultyMenuFacultyItem = facultiesMenu.findElement(
                By.xpath(
                        "//*[text()='FER']"
                )
        );
        facultyMenuFacultyItem.click();
        driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(1));

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

        driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(1));

        WebElement createButton = driver.findElement(By.cssSelector("button.w-full.px-2.max-\\[704px\\]\\:leading-none.max-\\[704px\\]\\:p-0.text-\\[16px\\].rounded-\\[20px\\].border-solid.border-2.hover\\:opacity-75.bg-primary.text-white.border-primary"));
        createButton.click();

        WebElement findDescriptionMissing = driver.findElement(By.xpath(
                "//*[text()='Please input the post body!']"
        ));
        driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(1));
        assertTrue(findDescriptionMissing.isDisplayed());
    }


}
