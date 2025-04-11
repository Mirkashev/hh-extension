console.log("content.js загружен");

let isHandlingForm = false;

function handleForm(): void {
  if (window.location.href.includes("/applicant/vacancy_response")) {
    console.log(
      "Обнаружена форма для дополнительных ответов. Выполняем действия..."
    );
    isHandlingForm = true;

    // TODO: не работает history back надо прям явно указывать url для перехода
    window.history.back();

    const interval = setInterval(() => {
      const hideButton = document.querySelector<HTMLButtonElement>(
        'button[data-qa="vacancy__blacklist-show-add"]'
      );
      if (hideButton) {
        console.log("Нажимаем на кнопку 'Скрыть':", hideButton);
        hideButton.click();

        console.log("Перезагружаем страницу...");
        window.location.reload();

        clearInterval(interval);
        isHandlingForm = false;
      }
    }, 500);
  }
}

function clickLinks(): void {
  // TODO: кринжа навайбкодил
  if (isHandlingForm) {
    console.log(
      "Обработка формы активна. Приостанавливаем выполнение clickLinks."
    );
    return;
  }

  const links = Array.from(document.querySelectorAll<HTMLAnchorElement>("a"));

  console.log("Все ссылки на странице:", links);

  const targetLinks = links.filter(
    (link) =>
      link.textContent &&
      link.textContent.includes("Откликнуться") && // Замените текст на нужный
      link.getAttribute("data-qa") === "vacancy-serp__vacancy_response" // Проверяем атрибут data-qa
  );

  console.log("Найденные ссылки:", targetLinks);

  targetLinks.forEach((link, index) => {
    const delay = Math.random() * (5000 - 3000) + 3000;
    setTimeout(() => {
      if (isHandlingForm) {
        console.log(
          "Обработка формы активна. Прерываем выполнение clickLinks."
        );
        return;
      }
      console.log(`Нажимаем на ссылку через ${delay} мс:`, link);
      link.click();
    }, delay * index);
  });
}

window.addEventListener("popstate", handleForm);

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "START_SCRIPT") {
    console.log("Запуск скрипта из content.ts");
    clickLinks(); // Вызов функции для нажатия ссылок
    sendResponse({ status: "Script started" });
  }
});
