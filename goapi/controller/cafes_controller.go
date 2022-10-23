package controller

import (
	"log"
	"net/http"
	"strconv"

	"github.com/akane-05/cafekatu/goapi/model/entity"
	"github.com/akane-05/cafekatu/goapi/model/repository"
	"github.com/gin-gonic/gin"
)

// DIを用いたコントローラーの実装
// インターフェースで実装すべきメソッドを決める
type CafesController interface {
	GetCafes(c *gin.Context)
	GetCafe(c *gin.Context)
	PostCafe(c *gin.Context)
}

// 構造体の宣言
type cafesController struct {
	dr repository.CafesRepository
}

// demoControllerのコンストラクタ
func NewCafesController(dr repository.CafesRepository) CafesController {
	return &cafesController{dr}
}

// ポインタレシーバ(*demoController)にメソッドを追加
func (dc *cafesController) GetCafes(c *gin.Context) {

	var query repository.CafeQuery

	log.Println("GetCafes")
	if err := c.BindQuery(&query); err != nil {
		log.Println("クエリパラメータに不正な値が含まれています。")
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "クエリパラメータに不正な値が含まれています。",
		})
		return
	}

	// GetDemosメソッドにwhere句追加する
	cafes, err := dc.dr.GetCafes(&query)
	if err != nil {
		log.Println(err.Error())
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "サーバーでエラーが発生しました。",
		})
		return
	}

	log.Println("フロントに返却")
	c.JSON(http.StatusOK, gin.H{
		"message": "ok",
		"data":    cafes,
	})

}

// ポインタレシーバ(*demoController)にメソッドを追加
func (dc *cafesController) GetCafe(c *gin.Context) {

	log.Println("GetCafe")

	// パスパラメータの取得、数字じゃなかったらどうするのか確認
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		log.Println(err)
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "idが不正な値です。数値を入力してください。",
		})
		return
	}

	//検索結果をDTOに取得
	// GetDemosメソッドにwhere句追加する
	cafe, err := dc.dr.GetCafe(&id)
	if err != nil {
		log.Println(err.Error())
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "サーバーでエラーが発生しました。",
		})
		return
	}

	log.Println("フロントに返却")
	c.JSON(http.StatusOK, gin.H{
		"message": "ok",
		"data":    cafe,
	})

	log.Println("フロントに返却")

}

// ポインタレシーバ(*demoController)にメソッドを追加
func (dc *cafesController) PostCafe(c *gin.Context) {

	log.Println("PostCafe")

	cafe := entity.CafeEntity{}
	if err := c.BindJSON(&cafe); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "リクエストに不正な値が含まれています。",
		})
		return
	}

	if err := dc.dr.InsertCafe(&cafe); err != nil {
		log.Println(err)
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "サーバーでエラーが発生しました。",
		})
		return
	}

	log.Println("登録完了　フロントに返却")
	c.JSON(http.StatusOK, gin.H{
		"message": "登録処理が完了しました。管理人が確認するまでお待ちください。",
	})

}
