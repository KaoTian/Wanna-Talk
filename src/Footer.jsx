function Footer() {
    return (
        <div className="footer_page">

            <footer className="text-center text-lg-start text-muted">

                <section class="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
                    {/* <div>
                        本文瀏覽次數:
                        <script type="text/javascript" language="Javascript" src="php/article_counter.php"></script>
                    </div> */}

                </section>

                <div className="container text-center text-md-start mt-5">
                    <div className="row mt-3">
                        <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
                            <h6 className="text-uppercase fw-bold mb-4" >
                                <i className="fas fa-gem me-3 text-secondary"></i>
                                <img src={require("./images/ltu.png")} width='150px' height='150px' alt='' />
                            </h6>
                            <p>
                                <b style={{ marginLeft: '20%', }}>網Talk論壇</b>
                            </p>
                        </div>
                        <div class="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
                            <h6 class="text-uppercase fw-bold mb-4">
                                所有學院
                            </h6>
                            <p >商管學院</p>
                            <p >設計學院</p>
                            <p >時尚學院</p>
                            <p >資管學院</p>
                            <p >民生學院

                            </p>
                        </div>

                        <div class="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
                            <h6 className="text-uppercase fw-bold mb-4">
                                探索
                            </h6>
                            <p >最新消息</p>
                            <p >活動</p>
                            <p >即時熱門</p>
                            <p>關於論壇</p>
                        </div>

                        <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
                            <h6 className="text-uppercase fw-bold mb-4">聯絡</h6>
                            <p><i className="fas fa-home me-3 text-secondary"></i>408284 臺中市南屯區嶺東路1號</p>
                            <p>
                                <i className="fas fa-envelope me-3 text-secondary"></i>
                                ltu1400@teamail.ltu.edu.tw
                            </p>
                            <p><i className="fas fa-phone me-3 text-secondary"></i>電話：04-2389-2088</p>
                            <p><i className="fas fa-print me-3 text-secondary"></i>傳真：04-2389-5293</p>
                        </div>
                    </div>
                </div>

                <div class="text-center p-4" style={{ backgroundColor: 'rgba(0, 0, 0, 0.025)', }}>
                    © 2022 Copyright:
                    <a className="text-reset fw-bold" href="https://mdbootstrap.com/">All Rights Reserved. Website by 網Talk</a>
                </div>
            </footer>
        </div>
    );
}

export default Footer;